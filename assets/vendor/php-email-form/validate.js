const ContactFormCard = document.getElementById('contact-form-card'), 
ContactForm = ContactFormCard.querySelector("#contact-form");

ContactForm.onsubmit = (e)=>{
  e.preventDefault();
  if(ContactForm.querySelector('.cf-msg-field') !== null)
  ContactForm.querySelector('.cf-msg-field').remove();

  var el = document.createElement('div')
  el.classList.add('alert')
  el.classList.add('alert-info')
  el.classList.add('cf-msg-field')
  el.classList.add('rounded-0')
  el.classList.add('mb-3')
  el.classList.add('py-2')
  el.innerText = `Sending Message...`;
  ContactForm.classList.add("disabled");
  ContactForm.insertBefore(el, ContactForm.children[0])

  let xhr = new XMLHttpRequest();

  xhr.open("POST", "send-message.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
      let response = JSON.parse(xhr.response);
      el.classList.remove('alert-info')
      if(response.status == 'success'){
        el.classList.add('alert-success')
        ContactForm.reset()
      }else{
        el.classList.add('alert-danger')
      }
      el.innerText = response.message
      ContactForm.classList.remove("disabled");
    }
  }
  let formData = new FormData(ContactForm);
  xhr.send(formData);
}
