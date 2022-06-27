let checkToken = async () => {
  try {
    const results = await fetch("http://localhost:3000/checkToken");
  } catch (error) {
    console.log(error);
  }
};

let fetchData = async () => {
  try {
    const results = await fetch("http://localhost:3000/callCountByEntryPoint");
    const response = await results.json();
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const ctx = document.getElementById("callCountByEntryPoint");

export const callCountByEntryPoint = new Chart(ctx, {
  type: "bar",
  data: {
    // labels: [],
    datasets: [
      {
        label: "Totals from January through Today",
        // data: [1],
        backgroundColor: ["rgba(93,205,205,1)"],
        hoverOffset: 4,
        borderColor: ["rgba(93,205,205,1)"]
      }
    ]
  },
  options: {
    responsive: true,
    aspectRatio: 1,
    layout: {
      padding: {
        left: 10,
        right: 30,
        top: 0,
        bottom: 10
      }
    },
    plugins: {
      labels: {
        render: "value",
        fontColor: [],
        fontSize: 12,
        fontStyle: "bolder",
        textMargin: 1,
        position: "border"
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#FED87C",
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: "Call Count By EntryPoint",
        color: "white",
        font: {
          size: 16
        },
        padding: {
          top: 10,
          bottom: 20
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: "white",
          font: {
            size: 12
          }
        },
        grid: {
          color: "white"
        }
      },
      x: {
        ticks: {
          color: "white",
          font: {
            size: 12
          }
        },
        grid: {
          color: "white"
        }
      }
    }
  }
});

async function updateChart() {
  try {
    const arrFromQuery = await fetchData();
    const epName = arrFromQuery.map(name => {
      return name.lastEntryPoint.name;
    });
    const epTotal = arrFromQuery.map(value => {
      return value.aggregation[0].value;
    });
    const epFontColor = arrFromQuery.map(() => {
      return "rgba(254,216,124,1)";
    });
    if (callCountByEntryPoint.data.datasets[0].data.length > 0) {
      callCountByEntryPoint.data.labels.length = 0;
      callCountByEntryPoint.data.datasets[0].data.length = 0;
    }
    callCountByEntryPoint.data.labels.push(...epName);
    callCountByEntryPoint.data.datasets[0].data.push(...epTotal);
    callCountByEntryPoint.options.plugins.labels.fontColor = epFontColor;
    callCountByEntryPoint.update();
  } catch (error) {
    // console.log(`a bit of a hic-up`);
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  setTimeout(() => {
    setInterval(async () => {
      updateChart();
    }, 5000);
  }, 5000);
  checkToken();
});
