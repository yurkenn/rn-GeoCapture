const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const getMapPreview = (lat, lng) => {
  const imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewURL;
};

export const getAddress = async (lat, lng) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  );
  if (!response.ok) {
    throw new Error('getAddress -> response Something went wrong!');
  }
  const resData = await response.json();
  if (!resData.results) {
    throw new Error('get Address -> resData Something went wrong!');
  }
  const address = resData.results[0].formatted_address;
  return address;
};
