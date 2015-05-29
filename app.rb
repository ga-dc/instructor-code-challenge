require 'bundler/setup'
require 'sinatra'
require 'json'  # <== missing this `require`

def all_movies
  # in case the file is empty or missing, return an empty collection
  JSON.parse(File.read('data.json')) rescue []
end

# get '/'  <== missing `do`
get '/' do
  # File.read('index.html')  <== missing path to file
  File.read('views/index.html')
end

# get 'favorites' do  <== missing initial slash
get '/favorites', provides: :html do
  @movies = all_movies.sort { |a, b|
    # compare movies by name
    a['name'] <=> b['name']
  }
  erb :favorites
end

get '/favorites', provides: :json do
  response.header['Content-Type'] = 'application/json'
  File.read('data.json')
end

# get '/favorites' do  <== this should be a post, not a get
post '/favorites' do
  # file = JSON.parse(File.read('data.json'))  <== no handling for empty file
  400 unless params[:name] && params[:oid]
  new_movie = { name: params[:name], oid: params[:oid] }
  movies = all_movies
  movies << new_movie
  File.write('data.json',JSON.pretty_generate(movies))
  new_movie.to_json
end

error 400 do
  'Invalid Request'
end

