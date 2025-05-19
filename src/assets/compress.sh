mkdir -p videos_compressed

for f in ./videos/*; do
  filename=$(basename "$f")
  name="${filename%.*}"
  target="./videos_compressed/${name}.mp4"
  if [ -f "$target" ]; then
    echo "文件已存在，跳过：$target"
    continue
  fi
  ffmpeg -i "$f" -vcodec libx264 -crf 28 -preset medium -an -r 30 -g 60 -sc_threshold 0 -colorspace bt709 -map_metadata -1 "$target"
done
