export const replaceUrlPattern = (url, params) => {
  if(!params) return url;

  return Object.keys(params).reduce((replacedUrl, paramKey) => {
    console.log(`
      replacedUrl - ${ replacedUrl },
      paramKey - ${ paramKey }
    `)

    const regExp = new RegExp(`{${paramKey}}`, "g");
    replacedUrl = replacedUrl.replace(regExp, params[paramKey]);
    console.log(replacedUrl, 1);
    return replacedUrl;
  }, url)
}



