echo "123" | ./your_grep.sh -E "\d"
echo ""
echo "alpha-num3ric" | ./your_grep.sh -E "\w"
echo ""

echo "apple" | ./your_grep.sh -E "[abc]"
echo ""

echo "dog" | ./your_grep.sh -E "[abc]"
echo "> last test should fail ('dog' | '[abc]')"
echo ""

echo "apple" | ./your_grep.sh -E "[^abc]"
echo ""

echo "cab" | ./your_grep.sh -E "[^abc]"
echo "> last test should fail ('cab' | '[^abc]')"
echo ""

echo "1 apple" | ./your_grep.sh -E "\d apple"
echo ""

echo "1 orange" | ./your_grep.sh -E "\d apple"
echo "> last test should fail ('1 orange' | '\d apple')"
echo ""

# \d\d\d apple should match "100 apples", but not "1 apple".
echo "100 apples" | ./your_grep.sh -E "\d\d\d apple"
echo ""

echo "1 apple" | ./your_grep.sh -E "\d\d\d apple"
echo "> last test should fail ('1 apple' | '\d\d\d apple')"
echo ""

# \d \w\w\ws should match "3 dogs" and "4 cats" but not "1 dog" (because the "s" is not present at the end).
echo "3 dogs" | ./your_grep.sh -E "\d \w\w\ws"
echo ""

echo "4 cats" | ./your_grep.sh -E "\d \w\w\ws"
echo ""

echo "1 dog" | ./your_grep.sh -E "\d \w\w\ws"
echo "> last test should fail ('1 dog' | '\d \w\w\ws')"
echo ""

echo "sally has 3 apples" | ./your_grep.sh -E "\d apple"
echo ""