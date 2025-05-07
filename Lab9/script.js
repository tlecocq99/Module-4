// Specify the configuration items and data for the chart
var myChart = echarts.init(document.getElementById("main"));
var option = {
  title: { text: "Fake Store Categories", left: "center", top: "top" },
  xAxis: {
    name: "Categories",
    nameLocation: "middle",
    nameGap: 40,
    nameTextStyle: {
      fontSize: 20,
    },
    type: "category",
    data: [],
  },
  yAxis: {
    name: "Number of Products in Category",
    nameLocation: "middle",
    nameGap: 40,
    nameTextStyle: {
      fontSize: 20,
    },
    type: "value",
  },
  series: [{ type: "bar", data: [] }],
};
// use this JSON to find and set correct option data for the chart
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    const categoryCounts = {};
    data.forEach((product) => {
      const category = product.category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    const categories = Object.keys(categoryCounts);
    const counts = Object.values(categoryCounts);

    //Update chart options
    option.xAxis.data = categories;
    option.series[0].data = counts;

    //Apply updated options to chart
    myChart.setOption(option);
  })
  .catch((error) => console.error("Error fetching data:", error));
//Display chart
myChart.setOption(option);
