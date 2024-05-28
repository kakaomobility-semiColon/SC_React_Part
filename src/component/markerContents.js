import './Kakao.css';

export const createMarkerContent = (data) => {
  // Create the main container
  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  const info = document.createElement('div');
  info.className = 'info';
  wrap.appendChild(info);

  const title = document.createElement('div');
  title.className = 'title';
  title.textContent = data.name;
  info.appendChild(title);

  const body = document.createElement('div');
  body.className = 'body';
  info.appendChild(body);

  const desc = document.createElement('div');
  desc.className = 'desc';
  body.appendChild(desc);

  const address = document.createElement('div');
  address.className = 'ellipsis';
  address.textContent = data.address;
  desc.appendChild(address);

  const chargerTypeName = document.createElement('div');
  chargerTypeName.className = 'jibun ellipsis';
  chargerTypeName.textContent = data.chargerTypeName;
  desc.appendChild(chargerTypeName);

  const operatorName = document.createElement('div');
  operatorName.className = 'jibun ellipsis';
  operatorName.textContent = `회사명 : ${data.operatorName}`;
  desc.appendChild(operatorName);

  const outputName = document.createElement('div');
  outputName.className = 'jibun ellipsis';
  outputName.textContent = `충전용량 : ${data.outputName}`;
  desc.appendChild(outputName);

  return wrap;
};

