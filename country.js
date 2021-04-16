let app = new Vue({
  el: '#table',
  data: {
    allData: null,
    showData: [],
    currentPage: 1,
    countPerPage: 25,
    
  },
  methods: {
    sortAsc(data) {
      return data.sort(function(country1, country2) {
        let name1 = country1.name.toLowerCase();
        let name2 = country2.name.toLowerCase();
        return name1 > name2 ? 1 : -1;
      });
    }
  },
  created: function() {
    let initFields = [
      'flag',
      'name',
      'alpha2Code',
      'alpha3Code',
      'nativeName',
      'altSpellings',
      'callingCodes'
    ];
    axios.get(`https://restcountries.eu/rest/v2/all?fields=${initFields.join(';')}`)
      .then(res => {
        this.allData = this.sortAsc(res.data);
        this.showData = this.allData.slice(this.countPerPage * (this.currentPage - 1), this.countPerPage * this.currentPage);
        
        // app.allData.forEach((item) => {
        //   console.log(item.name);
        // });
        // console.log(res);
      });
  }
});