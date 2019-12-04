import { round } from '../utils/round';

// compute sizes for column directed layouts
export const computeColumnLayout = ({ photos, columns, containerWidth}) => {
  photos = photos.slice(0, 10);
  let minColWidth = (containerWidth - 4 * columns) / (columns * 2);
  const margin = minColWidth / 100;
  const photosPositioned = [];
  //small picutre
  const sm = minColWidth;
  //medium picture
  const md = (3 * minColWidth + margin * 2) / 2;
  //large picture
  const lg = 3 * minColWidth + margin * 4;
  photos[0].width = photos[0].height = photos[1].width = photos[1].height = md;
  photos[2].width = photos[2].height = lg;
  photos[3].width = photos[3].height = photos[4].width = photos[4].height = photos[5].width = photos[5].height = photos[6].width = photos[6].height = photos[7].width = photos[7].height = photos[8].width = photos[8].height = sm;
  // column1
  photos[0].top = 0;
  photos[0].left = 0;
  photos[1].top = round((md + margin * 2), 1);
  photos[1].left = 0;
  // column2
  photos[2].top = 0;
  photos[2].left = round((md + margin * 2), 1);
  // column3
  photos[3].top = 0;
  photos[3].left = round((md + lg + margin * 4), 1);
  photos[4].top = round((sm + margin * 2), 1);
  photos[4].left = round((md + lg + margin * 4), 1);
  photos[5].top = round((sm * 2 + margin * 4), 1);
  photos[5].left = round((md + lg + margin * 4), 1);
  // column4
  photos[6].top = 0;
  photos[6].left = round((md + lg + sm + margin * 6), 1);
  photos[7].top = round((sm + margin * 2), 1);
  photos[7].left = round((md + lg + sm + margin * 6), 1);
  photos[8].top = round((sm * 2 + margin * 4), 1);
  photos[8].left = round((md + lg + sm + margin * 6), 1);

  for (var i = 0; i < photos.length; i++) {
    photosPositioned.push(photos[i]);
  }


  return photosPositioned;
/*
  // calculate each colWidth based on total width and column amount
  let colWidth = (containerWidth - margin * 2 * columns) / columns;
  // map through each photo to assign adjusted height and width based on colWidth
  const photosWithSizes = photos.map(photo => {
    const newHeight = photo.height / photo.width * colWidth;
    return {
      ...photo,
      width: round(photo.width, 1),
      height: round(photo.height, 1),
    };
  });

  // store all possible left positions
  // and current top positions for each column
  const colLeftPositions = [];
  const colCurrTopPositions = [];
  for (var i = 0; i < columns; i++) {
    colLeftPositions[i] = round(i * (colWidth + margin * 2), 1);
    colCurrTopPositions[i] = 0;
  }

  // map through each photo, then reduce thru each "column"
  // find column with the smallest height and assign to photo's 'top'
  // update that column's height with this photo's height
  const photosPositioned = photosWithSizes.map(photo => {
    const smallestCol = colCurrTopPositions.reduce((acc, item, i) => {
      acc = item < colCurrTopPositions[acc] ? i : acc;
      return acc;
    }, 0);

    photo.top = colCurrTopPositions[smallestCol];
    photo.left = colLeftPositions[smallestCol];
    colCurrTopPositions[smallestCol] = colCurrTopPositions[smallestCol] + photo.height + margin * 2;

    // store the tallest col to use for gallery height because of abs positioned elements
    const tallestCol = colCurrTopPositions.reduce((acc, item, i) => {
      acc = item > colCurrTopPositions[acc] ? i : acc;
      return acc;
    }, 0);
    photo.containerHeight = colCurrTopPositions[tallestCol];
    return photo;
  });
  return photosPositioned;
*/
};
