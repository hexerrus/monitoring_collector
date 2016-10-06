#!/bin/bash

rails db:drop
rails db:create
rails db:schema:load
rails db:seed
