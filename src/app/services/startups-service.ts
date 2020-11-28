class StartupsService {
  create(data: any) {
    return fetch('/.netlify/functions/startups-create', {
      body: JSON.stringify(data),
      method: 'POST',
    }).then(response => {
      return response.json();
    });
  }

  get(id: string) {
    return fetch(`/.netlify/functions/startups-read/${id}`).then(response => {
      return response.json();
    });
  }

  getAll() {
    return fetch('/.netlify/functions/startups-read-all').then((response) => {
      return response.json();
    });
  }

  update(id: string, data: any) {
    return fetch(`/.netlify/functions/startups-update/${id}`, {
      body: JSON.stringify(data),
      method: 'POST',
    }).then(response => {
      return response.json();
    });
  }

  delete(id: string) {
    return fetch(`/.netlify/functions/startups-delete/${id}`, {
      method: 'POST',
    }).then(response => {
      return response.json();
    });
  }
}

export default new StartupsService();
