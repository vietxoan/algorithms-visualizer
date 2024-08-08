// export function mergeSort(array)
// {
//     if (array.length <= 1 ) return array;
//     const middleIdx = Math.floor(array.length/2);
//     const leftArr = array.slice(0, middleIdx);
//     const rightArray = array.slice(middleIdx);
//     return doMerge(mergeSort(leftArr), mergeSort(rightArray));
// }
// function doMerge(leftArray, rightArray)
// {
//     let sortArr = [];
//     let i=0, j=0;
//     while (i < leftArray.length && j < rightArray.length)
//     {
//         if (leftArray[i] < rightArray[j]) {
//             sortArr.push(leftArray[i++])
//         } else {
//             sortArr.push(rightArray[j++])
//         }
//     }
//     while (i < leftArray.length){
//         sortArr.push(leftArray[i++])
//     }
//     while (j < rightArray.length){
//         sortArr.push(rightArray[j++])
//     }
//     return sortArr;
// }

export function getMergeSortAnimation(mainArray){
    const animations = [];
    if (mainArray.length <= 1) return mainArray;
    const bufferArray = mainArray.slice();
    mergeSort(mainArray, 0, mainArray.length - 1, bufferArray, animations);
    return animations;
}
function mergeSort(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx; //index để đối chiếu với mảng merged
    let i = startIdx; //index để đối chiếu với mảng bên trái
    let j = middleIdx + 1; //index để đối chiếu với mảng bên phải
    while (i <= middleIdx && j <= endIdx) {
      // đẩy mảng 2 index dùng để so sánh
      // push 1 lần mảng này vào mảng animations để đổi màu highlight
      animations.push([i, j]);
      // đẩy đẩy mảng 2 index vào thêm 1 lần nữa
      // để đổi lại màu về ban đầu, tắt highlight
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) { // bước so sánh
        // Khi có value nhỏ hơn thì đẩy mảng [index, value] vào mảng animations
        // mảng này sẽ dùng để thay đổi height value của cột có index đó trong style
        animations.push([k, auxiliaryArray[i]]);
        // Ghi đè value của mảng chính đã sắp xếp ở index k bằng value đã được sắp xếp để xử lý đệ quy ở cấp trên
        // Ở case này đã đúng thứ tự nên dùng value của mảng bên trái => xác định bằng i
        mainArray[k++] = auxiliaryArray[i++];
      } else {        
        animations.push([k, auxiliaryArray[j]]);
        // Ghi đè value của mảng chính đã sắp xếp ở index k bằng value đã được sắp xếp để xử lý đệ quy ở cấp trên
        // Ở case này đã đúng thứ tự nên dùng value của mảng bên phải => xác định bằng j
        mainArray[k++] = auxiliaryArray[j++];
      }
    }

    // xử lý nốt những value còn lại ở mảng bên trái
    while (i <= middleIdx) {
      // +++ tương tự như trên
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
      // --- tương tự như trên
    }

    //xử lý nốt value còn lại ở mảng bên phải
    while (j <= endIdx) {
      // +++ tương tự như trên
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
      // --- tương tự như trên
    }
  }