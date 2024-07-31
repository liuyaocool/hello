
# replace_string=`cat demo.html`
demo_content=$(<"demo.html")

# for file in ${1}/*; do
#     # 检查是否为文件
#     if [ -f "$file" ]; then
#         # 提取文件名（不含后缀）
#         filename=$(basename "$file" .${file##*.})
#         # fname=$(basename "$file")
        
#         touch ${2}/${filename}.html
#         # # # 将文本写入文件并替换字符串
#         echo "$text_content" \
#             | sed -e "s|dddddddddemo|$filename|g; s|fontRelPath|$file|g" \
#             > "${2}/${filename}.html"
#         # # sed -i "s/$replace_string/$filename/g" "$file"
#     fi
# done

# -n 为了解决最后一行不读取问题
while IFS= read -r line || [[ -n "$line" ]]; do
    fp=$(echo "$line" | cut -d '/' -f1)
    fn=$(echo "$line" | cut -d '/' -f2)
    fn=$(echo "$fn" | cut -d '.' -f1)
    mkdir -p $fp
    touch "$fp/$fn.html"
    echo "$demo_content" \
        | sed -e "s|%fontName%|$fn|g; s|%fontPath%|$line|g" \
        > "$fp/$fn.html"
done < "fontList"
