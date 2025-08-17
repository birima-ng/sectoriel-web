// geo-chart-benin.component.ts
import { Component, AfterViewInit } from '@angular/core';
declare var google: any;

@Component({
selector: 'app-accueil',
templateUrl: './accueil.component.html',
})
export class AccueilComponent implements AfterViewInit {
ngAfterViewInit() {
    google.charts.load('current', { packages: ['geochart'] });
    google.charts.setOnLoadCallback(this.drawBeninByRegion.bind(this));
  }

  drawBeninByRegion() {
    const data = google.visualization.arrayToDataTable([
      ['Department', 'Value'],
      ['Alibori', 30],
      ['Atakora', 50],
      ['Atlantique', 70],
      ['Borgou', 45],
      ['Collines', 55],
      ['Donga', 40],
      ['Kouffo', 65],
      ['Littoral', 90],
      ['Mono', 60],
      ['Ouémé', 80],
      ['Plateau', 35],
      ['Zou', 75],
    ]);

    const options = {
      region: 'BJ',            // ISO Alpha-2 du Bénin
      resolution: 'provinces', // Provinces (départements)
      backgroundColor: '#f9f9f9',
      datalessRegionColor: '#f0f0f0',
      legend: { textStyle: { color: '#333', fontSize: 14 } },

      // 🎨 Dégradé de couleurs selon les valeurs
      colorAxis: {
        colors: ['#e0f7fa', '#80deea', '#26c6da', '#00838f']
        // clair -> foncé en fonction des valeurs min -> max
      }
    };

    const chart = new google.visualization.GeoChart(
      document.getElementById('geochart_benin')
    );

    chart.draw(data, options);
  }
}
