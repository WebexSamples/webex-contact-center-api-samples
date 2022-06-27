let fetchData = async () => {
  try {
    const results = await fetch("http://localhost:3000/callStatsByAgent");
    const response = await results.json();
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const ctx = document.getElementById("callStatsByAgent");

export const callStatsByAgent = new Chart(ctx, {
  type: "line",
  data: {
    // labels: [],
    datasets: [
      {
        label: "Total from January through Today",
        // data: [1],
        backgroundColor: ["rgba(242,99,132,1)"],
        hoverOffset: 4,
        borderColor: ["rgba(242,99,132,1)"]
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
        text: "Average HandleTime By Agent (minutes)",
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

    const agentName = arrFromQuery.map(name => {
      return name.owner.name;
    });
    const handleAvg = arrFromQuery.map(value => {
      // convert to seconds
      let num = convert(value.aggregation[2].value);
      let sec = parseInt(num);
      return sec;
    });

    const epFontColor = arrFromQuery.map(() => {
      return "rgba(254,216,124,1)";
    });

    if (callStatsByAgent.data.datasets[0].data.length > 0) {
      callStatsByAgent.data.labels.length = 0;
      callStatsByAgent.data.datasets[0].data.length = 0;
    }

    callStatsByAgent.data.labels.push(...agentName);
    callStatsByAgent.data.datasets[0].data.push(...handleAvg);
    callStatsByAgent.options.plugins.labels.fontColor = epFontColor;
    callStatsByAgent.update();

    function convert(ms) {
      var minutes = Math.floor(ms / 60000);
      var seconds = ((ms % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
  } catch (error) {
    // console.log(`a bit of a hic-up`);
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  setTimeout(() => {
    setInterval(async () => {
      updateChart();
    }, 10000);
  }, 2000);

  // updateChart();
});
