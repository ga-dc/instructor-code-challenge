require 'bundler/setup'
require 'sinatra'
require 'json'  # <== missing this `require`

# get '/'  <== missing `do`
get '/' do
  #File.read('index.html')  <== missing path to file
  File.read('views/index.html')
end

# get 'favorites' do  <== missing initial slash
get '/favorites' do
  response.header['Content-Type'] = 'application/json'
  File.read('data.json')
end

# get '/favorites' do  <== this should be a post, not a get
post '/favorites' do
  # file = JSON.parse(File.read('data.json'))  <== no handling for empty file
  file = JSON.parse(File.read('data.json')) rescue []
  unless params[:name] && params[:oid]
    return 'Invalid Request'
  end  # <== missing this end
  movie = { name: params[:name], oid: params[:oid] }
  file << movie
  File.write('data.json',JSON.pretty_generate(file))
  movie.to_json
end
