/*

this is a pubsub pattern example.
the pubsub mechanism is in PubSub.
any class can use it by creating an instance ie:

  // the class that accepts subscribers must implement PubSub:
  //"MyClass" definitions:
  //...
  this.pubsub = new PubSub();
  this.load = function () {
    my $result = {};
    // ... load the stuff then announce to subiscribers via a "has_loaded" subscription
    this.pubsub.publish('has_loaded', [$result]); // announce something to subscribers callbacks
  };

  // the subscribers must subscribe/unsubscribe to that class instance
  my_class = new MyClass();
  my_callback = () => {};
  myclass.pubsub.subscribe('has_loaded', my_callback)

*/

const PubSub = function () {
  "use strict";
  this.subject = {};
  this.publish = (subject, args) => {
    args = args || [];
    this.subject[subject].forEach((callback) => {
      callback.apply(args);
    });
  };
  this.subscribe = (subject, callback) => {
    this.subject[subject] = this.subject[subject] || [];
    this.subject[subject].push(callback);
    const subscription = [subject, callback];
    return subscription;
  };
  this.unsubscribe = (subscription) => {
    const subject = subscription[0];
    const callback = subscription[1];
    this.subject[subject].forEach((v, i) => {
      if (v == callback) this.subject[subject].splice(i, 1);
    });
  };
};

const rmm_profile = function () {
  /*
    pubsub available:
    - profiles_verified.updated
    - errors
  */
  this.profiles_verified = undefined;
  this.pubsub = new PubSub();
  this.load = function () {
    // makes the request to load the profile
    this.pubsub.publish("profiles_verified.updated", ["value1", "value2"]); // announce something to subscribers callbacks
  };
  this.post_form_and_simulate_error = function () {
    // makes the request to post the form, and the server returns an error (fields invalid for example)
    // so the other class can pubsub to errors
    const $error = {
      fields: {
        first_name: ["Name is required"],
        last_name: ["Invalid lastname"],
      },
    };
    this.pubsub.publish("errors", [$error]); // announce something to subscribers callbacks
  };
};

let secs = 0; //seconds counter

const profile = new rmm_profile();
const subscription1 = profile.pubsub.subscribe(
  "profiles_verified.updated",
  function () {
    console.log("list has changed, do something");
  }
);
const subscription2 = profile.pubsub.subscribe("errors", function () {
  console.log(
    "there was an error, use the snackbar or something to display it"
  );
});

const do_stuff = () => {
  console.log("do_stuff");
  profile.load();
  profile.post_form_and_simulate_error();
  if (secs > 10) {
    console.log("stopping do_stuff");
    return;
  }
  console.log(secs++ + " seconds have passed");
  setTimeout(do_stuff, 1000); // do stuff every 1 second
};

do_stuff();

const unsubscribe1 = () => {
  profile.pubsub.unsubscribe(subscription1);
  console.log(`Unsubscribing from subscription1(${subscription1[0]})`);
};
const unsubscribe2 = () => {
  profile.pubsub.unsubscribe(subscription2);
  console.log(`Unsubscribing from subscription2(${subscription2[0]})`);
};
setTimeout(unsubscribe1, 5000); // unsubscribe from subscription1 after 5 seconds
setTimeout(unsubscribe2, 7000); // unsubscribe from subscription1 after 5 seconds
