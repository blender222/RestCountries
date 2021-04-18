let app = new Vue({
  el: '#table',
  data: {
    searchText: '',
    searcher: null,
    dataAll: [],
    dataShow: [],
    dataDetail: {},
    currentPage: 1,
    countPerPage: 25,
    isAsc: true,
    bsModal: new bootstrap.Modal(document.querySelector('#modal-detail')),
  },
  methods: {
    sortAsc(data) {
      return data.sort(function(country1, country2) {
        let name1 = country1.name.toLowerCase();
        let name2 = country2.name.toLowerCase();
        return name1 > name2 ? 1 : -1;
      });
    },
    updateDataShow() {
      this.searchText = '';
      this.dataShow = this.dataAll.slice(this.countPerPage * (this.currentPage - 1), this.countPerPage * this.currentPage);
    },
    showDetail(data) {
      this.dataDetail = data;
    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.dataAll.length / this.countPerPage);
    },
    dataDetailText() {
      let copy = Object.assign({}, this.dataDetail);
      delete copy.name;
      delete copy.flag;
      let arr = Object.entries(copy).sort();
      return arr;
    }
  },
  watch: {
    isAsc: function() {
      this.dataAll = this.dataAll.reverse();
      this.updateDataShow();
    },
    currentPage: function() {
      this.updateDataShow();
    },
    searchText: function(text) {
      console.log('run');
      if (text == '') {
        this.updateDataShow();
        return;
      }
      let result = this.searcher.search(this.searchText);
      this.dataShow = result;
    }
  },
  created: function() {
    axios.get(`https://restcountries.eu/rest/v2/all`)
      .then(res => {
        this.dataAll = this.sortAsc(res.data);
        this.updateDataShow();
        
        this.searcher = new FuzzySearch(this.dataAll, ['name'], {
          sort: true,
        });
      });
  }
});