import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TableTopics';

  particlesName = "tsparticles";

  particlesOptions = {
    particles: {
      color: {
        value: ["#2374C6", "#C20F00", "#FFDD22", "#000000", "#FFFFFF"]
      },
      move: {
        direction: "right",
        enable: true,
        speed: 6,
        straight: true
      },
      size: {
        random: true,
        value: 50
      }
    }
  }
}
