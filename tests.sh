echo "123" | ./your_grep.sh -E "\d"
echo ""
echo "alpha-num3ric" | ./your_grep.sh -E "\w"
echo ""

echo "apple" | ./your_grep.sh -E "[abc]"
echo ""

echo "dog" | ./your_grep.sh -E "[abc]"
echo "> last test should fail (dog | [abc])"
echo ""

echo "apple" | ./your_grep.sh -E "[^abc]"
echo ""

echo "cab" | ./your_grep.sh -E "[^abc]"
echo "> last test should fail (cab | [^abc])"
echo ""
