<?php
  foreach($_POST as $field_name => $field_value){
    $$field_name = htmlspecialchars($field_value);
  }

  if(filter_var($email, FILTER_VALIDATE_EMAIL)){
    /**
     * Continue Sending Message if the Given Email is validated
     */

    // Put the your site email here [the email you want to receive the message]
    $recv = "naseemlaiba574@gmail.com"; 
    $subject = "From: $name <$email>";
    $body = "You have receive a message from YOUR SITE using the YOUR SITE's Contact Form. See the details below.\n\nName: $name\nEmail: $email\nPhone: $phone\nWebsite: $website\n\nMessage:\n$message\n\nRegards,\n$name";
    $body = trim($body, "\t");
    $sender = "From: $email";
    try{
      mail($recv, $subject, $body, $sender);
      $response['status'] = 'success';
      $response['message'] = "Message Sent! We will reach you back as soon as we see your message.";
    }catch (Exception $e){
      $response['status'] = 'failed';
      $response['message'] = $e->getMessage();
    }
  }else{
    /**
     * Given Email is invalid
     */

    $response['status'] = 'failed';
    $response['message'] = "Please Enter a valid email address!";
  }
  echo json_encode($response);
?>
