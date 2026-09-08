interface Worker {
  work(): void;
  eat(): void;
  fly(): void;
}

class HumanWorker implements Worker {
  work(): void {
    console.log("Human working");
  }

  eat(): void {
    console.log("Human eating");
  }

  fly(): void {
    throw new Error("Humans cannot fly");
  }
}

class RobotWorker implements Worker {
  work(): void {
    console.log("Robot working");
  }

  eat(): void {
    throw new Error("Robots do not eat");
  }

  fly(): void {
    throw new Error("Robots cannot fly");
  }
}
class EmailService {
  send(message: string): void {
    console.log(`Email Sent: ${message}`);
  }
}

class NotificationManager {
  private emailService = new EmailService();

  sendNotification(message: string): void {
    this.emailService.send(message);
  }
}


class Bird {
  fly(): void {
    console.log("Flying...");
  }
}

class Penguin extends Bird {
  fly(): void {
    throw new Error("Penguins can't fly");
  }
}

// Client Code
const notification = new NotificationManager();
notification.sendNotification("Order placed");

const bird: Bird = new Penguin();
bird.fly(); // Runtime error


