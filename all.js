var app = new Vue({
  el: '#app',
  data: {
    data: [],
    currentPage: 0,
    locations: [],
    currentLocation: '',
  },
  methods: {
    getUniqueList() {
      const locations = new Set()
      const vm = this
      vm.data.forEach((item, i) => {
        locations.add(item.Zone)
      })
      vm.locations = Array.from(locations)
    },
  },
  computed: {
    filterData: function () {
      const vm = this
      let items = []
      if (vm.currentLocation !== '') {
        items = vm.data.filter((item, i) => {
          return item.Zone == vm.currentLocation
        })
      } else {
        items = vm.data
      }

      //頁數
      const newData = []
      items.forEach((item, i) => {
        if (i % 10 === 0) {
          newData.push([])
        }
        const page = parseInt(i / 10)
        newData[page].push(item)
      })
      return newData
    },
  },
  created() {
    const vm = this
    axios
      .get(
        'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json'
      )
      .then(function (response) {
        console.log(response)
        vm.data = response.data.result.records
        console.log(vm.data)
        vm.getUniqueList()
      })
      .catch(function (error) {
        console.log(error)
      })
  },
})
