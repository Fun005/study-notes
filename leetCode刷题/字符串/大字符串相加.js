/**
 * 实现一个函数，输入为两个超大的整数字符串，输出为这两个超大整数之和的字符串
 *  sting1="12345678909876543210234567890"
 *  string2="98765432101234567890987654321"
 *  result= "111111111011111111101222222211'
 */

function addLargeNumbers(num1, num2) {
    const len1 = num1.length;
    const len2 = num2.length;
    const maxLen = Math.max(len1, len2);
    const result = new Array(maxLen + 1).fill(0);

    for (let i = 0; i < maxLen; i++) {
        const digit1 = i < len1 ? parseInt(num1[len1 - 1 - i]) : 0;
        const digit2 = i < len2 ? parseInt(num2[len2 - 1 - i]) : 0;
        const sum = digit1 + digit2 + result[i];
        result[i] = sum % 10;
        result[i + 1] += Math.floor(sum / 10);
    }

    const finalResult = result.reverse().join('');
    return finalResult.replace(/^0+/, '') || '0';
}

// Example usage:
const num1 = '12345678901234567890';
const num2 = '98765432109876543210';
console.log(addLargeNumbers(num1, num2));

// Mark: 如果参数不同长度得补0补齐
// Mark: 最高位需要判断，大于9就得多加一位1
// Mark: 字符串要转成数字进行计算
// Mark: 最后要去掉前导0


// function sortInnerObjects(obj) {
//     return Object.fromEntries(
//         Object.entries(obj).map(([key, value]) => [
//             key,
//             Object.fromEntries(Object.entries(value).sort(([k1], [k2]) => k1 - k2)),
//         ])
//     );
// }