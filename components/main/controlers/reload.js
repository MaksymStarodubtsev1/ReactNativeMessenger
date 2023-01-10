export default function reload() {
  return fetch('https://vue-http-demo-763e4-default-rtdb.europe-west1.firebasedatabase.app/olenamaksym.json')
  .then((response) => response.json())
}