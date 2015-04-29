class ImagesController < ApplicationController
  # 5 miles is about .072 degrees for lat and long around UCLA's location
  @@FIVE_MILES = 0.072

  # GET /images?lat=&long=
  #
  # Fetch the top 50 images around a specified geographic location, sorted by post date.
  # Excludes images ranked below -5.
  # @TODO use a better sorting algorithm that takes score into account, too.
  def index
    # Default to 0,0 for location if the parameters aren't set...
    lat = params[:lat] ? params[:lat].to_f : 0
    long = params[:long] ? params[:long].to_f : 0

    # We want to search within a 5 mile box (which gives us about a 7 mile radius)
    location_bounds = {
      lat_lower: lat - @@FIVE_MILES,
      lat_upper: lat + @@FIVE_MILES,
      long_lower: long - @@FIVE_MILES,
      long_upper: long + @@FIVE_MILES
    }
    images = Image.where( "location_lat >= :lat_lower AND location_lat <= :lat_upper AND location_long >= :long_lower AND location_long <= :long_upper AND score > -5", location_bounds ).order( created_at: :desc ).limit(50)
    render :json => images.all.to_json

  end
end
