class ApiFeatures {

  constructor(query, queryString) {

    this.query = query;

    this.queryString = queryString;
  }


  // =========================
  // SEARCH
  // =========================
  search() {

    const keyword = this.queryString.keyword
      ? {
          text: {
            $regex: this.queryString.keyword,
            $options: "i"
          }
        }
      : {};

    this.query = this.query.find({
      ...keyword
    });

    return this;
  }


  // =========================
  // FILTER
  // =========================
  filter() {

    const queryCopy = {
      ...this.queryString
    };

    const removeFields = [
      "keyword",
      "page",
      "limit"
    ];

    removeFields.forEach(
      (key) => delete queryCopy[key]
    );

    this.query = this.query.find(queryCopy);

    return this;
  }


  // =========================
  // PAGINATION
  // =========================
  pagination(resultPerPage) {

    const currentPage =
      Number(this.queryString.page) || 1;

    const skip =
      resultPerPage * (currentPage - 1);

    this.query = this.query
      .limit(resultPerPage)
      .skip(skip);

    return this;
  }


  // =========================
  // SORTING
  // =========================
  sort() {

    if (this.queryString.sort) {

      const sortBy = this.queryString.sort
        .split(",")
        .join(" ");

      this.query = this.query.sort(sortBy);

    } else {

      this.query = this.query.sort("-createdAt");
    }

    return this;
  }
}

module.exports = ApiFeatures;