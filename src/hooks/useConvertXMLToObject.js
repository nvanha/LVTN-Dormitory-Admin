/* eslint-disable no-restricted-syntax */

const useConvertXMLToObject = (xml, arrayTags) => {
  let dom = null;
  if (window.DOMParser) dom = new DOMParser().parseFromString(xml, 'text/xml');
  else if (window.ActiveXObject) {
    // eslint-disable-next-line no-undef
    dom = new ActiveXObject('Microsoft.XMLDOM');
    dom.async = false;
    if (!dom.loadXML(xml)) {
      // eslint-disable-next-line no-throw-literal
      throw `${dom.parseError.reason} ${dom.parseError.srcText}`;
    }
  } else throw new Error('cannot parse xml string!');

  function parseNode(xmlNode, result) {
    if (xmlNode.nodeName === '#text') {
      const v = xmlNode.nodeValue;
      if (v.trim()) result['#text'] = v;
      return;
    }

    const jsonNode = {},
      existing = result[xmlNode.nodeName];
    if (existing) {
      if (!Array.isArray(existing)) {
        result[xmlNode.nodeName] = [existing, jsonNode];
      } else result[xmlNode.nodeName].push(jsonNode);
    } else if (arrayTags && arrayTags.indexOf(xmlNode.nodeName) !== -1) {
      result[xmlNode.nodeName] = [jsonNode];
    } else result[xmlNode.nodeName] = jsonNode;

    if (xmlNode.attributes) {
      for (const attribute of xmlNode.attributes) {
        jsonNode[attribute.nodeName] = attribute.nodeValue;
      }
    }

    for (const node of xmlNode.childNodes) parseNode(node, jsonNode);
  }

  const result = {};
  for (const node of dom.childNodes) parseNode(node, result);

  return result;
};

export default useConvertXMLToObject;
