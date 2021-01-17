export default {
  create: (data: any) => fetch('/.netlify/functions/startups-create', {
    body: JSON.stringify(data),
    method: 'POST',
  }).then((response) => response.json()),
  get: (id: string) => fetch(`/.netlify/functions/startups-read/${id}`).then((response) => response.json()),
  getAll: () => fetch('/.netlify/functions/startups-read-all').then((response) => response.json()),
  update: (id: string, data: any) => fetch(`/.netlify/functions/startups-update/${id}`, {
    body: JSON.stringify(data),
    method: 'POST',
  }).then((response) => response.json()),
  destroy: (id: string) => fetch(`/.netlify/functions/startups-delete/${id}`, {
    method: 'POST',
  }).then((response) => response.json()),
};
