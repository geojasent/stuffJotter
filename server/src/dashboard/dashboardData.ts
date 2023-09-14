const dashboardData = (locationData: object[], itemData: object[]) => {
  let itemMap = new Map();

  locationData.map((location: any) => {
    const lowerCaseLocation = location.place.toLowerCase();
    const filePath = location.file_path;
    const filename = filePath ? filePath.split("/").slice(-1)[0] : "";
    itemMap.set(lowerCaseLocation, { count: 0, file: filename });
  });

  itemData.map((item: any) => {
    itemMap.get(item.place).count++;
  });

  const obj = Object.fromEntries(itemMap);
  const jsonString = JSON.stringify(obj);
  return jsonString;
};

export { dashboardData };
