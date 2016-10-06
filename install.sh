#!/bin/bash
ENV="production"

bin/bundle
rails db:drop RAILS_ENV=$ENV DISABLE_DATABASE_ENVIRONMENT_CHECK=1
rails db:create RAILS_ENV=$ENV
rails db:schema:load RAILS_ENV=$ENV
rails db:seed RAILS_ENV=$ENV

echo 'Done'
