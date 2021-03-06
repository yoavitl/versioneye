Versioneye::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb

  # Code is not reloaded between requests
  config.cache_classes = true
  config.action_controller.perform_caching = false
  config.cache_store = :dalli_store, ["#{Settings.instance.memcache_addr}:#{Settings.instance.memcache_port}"],{
    :username => Settings.instance.memcache_username, :password => Settings.instance.memcache_password,
    :namespace => 'veye', :expires_in => 1.day, :compress => true }

  # Full error reports are disabled and caching is turned on
  config.consider_all_requests_local       = false

  # Enable Rails's static asset server (NGinx will cahce it automatically)
  config.serve_static_files = true
  config.action_dispatch.x_sendfile_header = nil

  # Log error messages when you accidentally call methods on nil.
  config.whiny_nils = false

  # Compress JavaScripts and CSS
  config.assets.css_compressor = :sass
  config.assets.js_compressor = :uglifier

  # Precompile additional assets (application.js, application.css, and all non-JS/CSS are already added)
  config.assets.precompile += %w( application.css application_lp.css *.js *.scss )

  # Don't fallback to assets pipeline if a precompiled asset is missed
  config.assets.compile = false

  # Generate digests for assets URLs
  config.assets.digest = true

  config.eager_load = true

  # Defaults to Rails.root.join("public/assets")
  # config.assets.manifest = YOUR_PATH

  # Specifies the header that your server uses for sending files
  # config.action_dispatch.x_sendfile_header = "X-Sendfile" # for apache
  # config.action_dispatch.x_sendfile_header = 'X-Accel-Redirect' # for nginx

  # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
  config.force_ssl = false

  # See everything in the log (default is :info)
  config.log_level = :info

  # Use a different logger for distributed setups
  # config.logger = SyslogLogger.new
  config.logger = Logger.new("#{Rails.root}/log/#{Rails.env}.log", 10, 10.megabytes)

  # Use a different cache store in production
  # config.cache_store = :mem_cache_store

  # Enable serving of images, stylesheets, and JavaScripts from an asset server
  # config.action_controller.asset_host = "http://assets.example.com"

  # Disable delivery errors, bad email addresses will be ignored
  # config.action_mailer.raise_delivery_errors = false

  # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
  # the I18n.default_locale when a translation can not be found)
  config.i18n.fallbacks = true

  # Send deprecation notices to registered listeners
  config.active_support.deprecation = :notify

  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
     :address              => 'email-smtp.eu-west-1.amazonaws.com',
     :port                 => 587,
     :user_name            => Settings.instance.smtp_username,
     :password             => Settings.instance.smtp_password,
     :domain               => 'versioneye.com',
     :authentication       => 'plain',
     :enable_starttls_auto => true  }
  config.action_mailer.perform_deliveries    = true
  config.action_mailer.raise_delivery_errors = true

  routes.default_url_options = { host: Settings.instance.server_host, port: Settings.instance.server_port }

  Stripe.api_key = Settings.instance.stripe_secret_key

  Octokit.configure do |c|
    c.api_endpoint = Settings.instance.github_api_url
    c.web_endpoint = Settings.instance.github_base_url
  end

end
