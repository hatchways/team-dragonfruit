export default {
  // autoFetch, if error => redirect
  autoFetch: () => {
    return fetch("/api/users/me").then((res) => {
      if (res.status === 401) {
        return { errorMsg: { msg: "Unauthorized" }, redirecting: true };
      } else if (res.status === 403) {
        return { errorMsg: { msg: "Forbidden" }, redirecting: true };
      } else {
        return res.json().then((data) => data);
      }
    });
  },

  // get user info
  getUser: () => {
    return fetch("/api/users/balance")
      .then((res) => res.json())
      .then((data) => data);
  },

  // topup credit
  topup: (credit) => {
    return fetch("/api/users/topup", {
      method: "POST",
      body: JSON.stringify({ credit }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.status !== 200) {
        return { errorMsg: { msg: "Error occured" } };
      } else {
        return res.json().then((data) => data);
      }
    });
  },

  // requestedReviews
  requestedReviews: () => {
    return fetch("/api/users/requested")
      .then((res) => res.json())
      .then((data) => data);
  },
  // receivedReviews
  receivedReviews: () => {
    return fetch("/api/users/received")
      .then((res) => res.json())
      .then((data) => data);
  },
  // rating
  rating: (review_id, rating) => {
    return fetch(`/api/users/rating/${review_id}`, {
      method: "PATCH",
      body: JSON.stringify({ rating: rating }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.status !== 200) {
        return { errorMsg: { msg: "Error occured" } };
      } else {
        return res.json().then((data) => data);
      }
    });
  },
};
