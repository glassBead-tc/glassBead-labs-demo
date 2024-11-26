const Contact = () => {
    return (
      <div className="container mx-auto px-4 pt-24">
        <div className="glass-panel p-8 rounded-lg max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-cyber-teal">Contact Us</h1>
          <div className="space-y-6">
            <p className="text-cyber-text">
              Ready to join us on the digital frontier? Get in touch with our team.
            </p>
            <div className="space-y-4">
              <div className="glass-panel p-4 rounded">
                <p className="text-cyber-orange">Email</p>
                <p className="text-cyber-text">glassBead-tc@proton.me</p>
              </div>
              <div className="glass-panel p-4 rounded">
                <p className="text-cyber-orange">Location</p>
                <p className="text-cyber-text">Alabama, United States</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Contact;