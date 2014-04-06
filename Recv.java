import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.QueueingConsumer;

public class Recv {

  private final static String EXCHANGE_NAME = "bpm";

  public static void main(String[] argv) throws java.io.IOException, java.lang.InterruptedException {

    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("localhost");
    Connection connection = factory.newConnection();
    Channel channel = connection.createChannel();

    // channel.exchangeDeclare(EXCHANGE_NAME, "fanout", false, false, true, null );  // Exchange, type, passive, durable, autoDelete, args
    //channel.exchangeDeclare(EXCHANGE_NAME, "fanout", false, true, true, null );
    //channel.exchangeDeclare(EXCHANGE_NAME, "fanout", true, false, true, null );
    channel.exchangeDeclare(EXCHANGE_NAME, "fanout", false, true, null ); // see 
    String  queueName = channel.queueDeclare().getQueue();
    channel.queueBind(queueName, EXCHANGE_NAME, "");

    System.out.println(" [*] Waiting for message. To exit press Ctrl-C");

    QueueingConsumer consumer = new QueueingConsumer(channel);
    channel.basicConsume(queueName, true, consumer);

    while (true) {
      QueueingConsumer.Delivery delivery = consumer.nextDelivery();
      String message = new String(delivery.getBody());
      System.out.println(" [x] Received '" + message + "'");
    }
  }

}
