 $(document).ready(function(){
        $('#etsy-search').bind('submit', function() {
            api_key = "zz5lmkz7j0cbgf6nwfm3wduq";
            terms = $('#etsy-terms').val();
            etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords="+
                terms+"&limit=12&includes=Images:1&api_key="+api_key;

            $('#etsy-images').empty();
            $('<p></p>').text('Searching for '+terms).appendTo('#etsy-images');

            $.ajax({
                url: etsyURL,
                dataType: 'jsonp',
                success: function(data) {
                    if (data.ok) {
                        $('#etsy-images').empty();
                        if (data.count > 0) {
                            var html = "";
                            $.each(data.results, function(i,item) {
                            	
                            	//alert (item.title); item.price

                                $("<img/>").attr("src", item.Images[0].url_75x75).appendTo("#etsy-images").wrap(
                                    "<a href='" + item.url + "'></a>"
                                );

                                //prints 4 images per line
                                if (i%4 == 3) {
                                    $('<br/>').appendTo('#etsy-images');
                                }

                               $('<p>' + item.title + '</p>').appendTo('#etsy-images');
                              
                               $('<p> cost:' + item.price + '</p>').appendTo('#etsy-images');


                               // $('<p></p>').text(item.title);
                               // var html = "";
                               //html += '<p>' + value.Title + '</p>';
                               //$('.etsy-images').html(html);

                            });


                        } else {
                            $('<p>No results.</p>').appendTo('#etsy-images');
                        }
                    } else {
                        $('#etsy-images').empty();
                        alert(data.error);
                    }
                }
            });

            return false;
        })
});
