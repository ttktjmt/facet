<template>
    <video ref="videoEl" v-bind="$attrs">
        <slot />
    </video>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const videoEl = ref(null)
let observer = null

onMounted(() => {
    observer = new IntersectionObserver(
        ([entry]) => {
            if (!videoEl.value) return
            if (entry.isIntersecting) {
                videoEl.value.play().catch(() => { })
            } else {
                videoEl.value.pause()
            }
        },
        { threshold: 0.1 }
    )
    if (videoEl.value) {
        observer.observe(videoEl.value)
        videoEl.value.pause()
    }
})

onBeforeUnmount(() => {
    if (observer && videoEl.value) {
        observer.unobserve(videoEl.value)
        observer.disconnect()
    }
})
</script>
