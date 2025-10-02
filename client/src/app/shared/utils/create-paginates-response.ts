import { IRssNews } from 'src/app/interfaces/rssNews';

export function createPaginatedResponse(
  parsedData: IRssNews,
  page: number,
  limit: number
) {
  const totalItems = parsedData.items.length;

  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  if (page < 1) {
    page = 1;
  }
  
  if (limit < 1) {
    limit = 10;
  }

  if (page > totalPages) {
    page = totalPages || 1;
  }

  return {
    ...parsedData,
    items: parsedData.items.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalItems,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}
