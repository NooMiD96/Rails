<template>
  <div id="fetch-data">
    <h1>Weather forecast</h1>
    <p>This component demonstrates fetching data from the server.</p>
    <em v-show="fetchdata.pending">Loading...</em>
    <div v-show="!fetchdata.pending">
      <table v-if="fetchdata.forecasts.length" class="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in fetchdata.forecasts" v-bind:key="item.id">
            <td>{{ item.dateFormatted }}</td>
            <td>{{ item.temperatureC }}</td>
            <td>{{ item.temperatureF }}</td>
            <td>{{ item.summary }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>
        <em>Empty :(</em>
      </p>
    </div>
  </div>
</template>

<script src="./fetchdata.ts"></script>
