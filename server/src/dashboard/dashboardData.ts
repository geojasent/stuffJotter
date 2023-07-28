const dashboardData = (locationData: object[], itemData: object[]) => {
  let itemMap = new Map();

  locationData.map((location: any) => {
    const lowerCaseLocation = location.place.toLowerCase();
    itemMap.set(lowerCaseLocation, 0);
  });

  itemData.map((item: any) => {
    itemMap.set(item.place, itemMap.get(item.place) + 1 || 1);
  });

  const obj = Object.fromEntries(itemMap);
  const jsonString = JSON.stringify(obj);
  return jsonString;
};

export { dashboardData };
