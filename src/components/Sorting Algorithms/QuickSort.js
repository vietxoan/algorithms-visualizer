// export function quickSort(arr)
// {
//   if(arr.length < 2) return arr;
    
//     // *** lấy phần tử cuối của 'arr' làm 'pivot'
//     const pivotIndex = arr.length - 1;
//     const pivot = arr[pivotIndex];

//     const left = [];
//     const right = [];
    
//     let currentItem;
//     // *** 'i < pivotIndex' => chúng ta sẽ không loop qua 'pivot' nữa
//     for(let i = 0; i < pivotIndex; i++) {
//         currentItem = arr[i];
        
//         if(currentItem < pivot) {
//             left.push(currentItem);
//         } else {
//             right.push(currentItem);
//         }
//     }

//     return [...quickSort(left), pivot, ...quickSort(right)];
// }

export function getQuickSortAnimation(mainArray){
  const animations = [];
  if (mainArray.length <= 1) return mainArray;
  quickSort(mainArray,0 , mainArray.length-1, animations);
  return animations;
}
function quickSort(
  mainArray,
  startIdx,
  endIdx,
  animations
) 
{
  if (startIdx < endIdx)
  {
    const pivotIdx = getPivot(mainArray, startIdx, endIdx, animations)
    quickSort(mainArray, startIdx, pivotIdx-1, animations);
    quickSort(mainArray, pivotIdx+1, endIdx, animations);
  }
}

function getPivot(mainArray, startIdx, endIdx, animations) // tìm pivot value và đặt nó vào đúng vị trí
{
  const pivotValue = mainArray[startIdx];
  let swapIdx = startIdx;

  for(let i = startIdx +1; i <= endIdx; i++)
  {
    animations.push([startIdx, i]);
    animations.push([startIdx, i]);
    if (mainArray[i] < pivotValue) //dùng pivot để chia ra 2 phần lớn hơn và nhỏ hơn
    {
      swapIdx ++
      [mainArray[i], mainArray[swapIdx]] = [mainArray[swapIdx], mainArray[i]] //đẩy giá trị lớn hơn pivot về các index lơn hơn vị trí của pivot
      animations.push([i, mainArray[i]]);
      animations.push([swapIdx, mainArray[swapIdx]]);
    }
    else // chỉ để thể hiện cột so sánh không thay đổi value gì
    {
      animations.push([i, mainArray[i]]);
      animations.push([swapIdx, mainArray[swapIdx]]);
    }
  }
  [mainArray[startIdx], mainArray[swapIdx]] = [mainArray[swapIdx], mainArray[startIdx]] //đổi value pivot về đúng vị trí của nó
  animations.push([startIdx, swapIdx]);
  animations.push([startIdx, swapIdx]);
  animations.push([startIdx, mainArray[startIdx]]);
  animations.push([swapIdx, mainArray[swapIdx]]);
  return swapIdx;
}