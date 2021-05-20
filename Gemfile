source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.6'

gem 'rails', '~> 6.0.3.5'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 4.3.8'
gem 'sass-rails', '~> 5'
gem 'webpacker', '~> 4.2'
gem 'bcrypt', '~> 3.1.7'
gem 'chronic', '~> 0.10.2'
gem 'bootsnap', '>= 1.4.2', require: false

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'pry-rails'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# authentication
gem 'devise'

# HTTP requests
gem 'http'
# XML/HTML parsing
gem 'nokogiri'

gem 'shopify-money', require: 'money'
