/*
Developer: Simon Lindsay / @simonlindsay
*/
webpackJsonp([2],{

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	var appLoaderLogo = __webpack_require__(13);

	module.exports = {

	  init: function() {

	    this.el = document.createElement("div");
	    this.el.className = "app-loader app-loader--animate";
	    document.body.appendChild(this.el);

	    this.logo = document.createElement('div');
	    this.logo.className = "block-home-logo block-home-logo--animate block-home-logo--animate-in";
	    this.logo.innerHTML = '<h1 class="block-home-logo__content">The Most Wonderful Time of the Year</h1>';

	    this.el.appendChild(this.logo);

	    var blockSiteLoader = '<h1>Loading...</h1>';

	    this.siteLoader = document.createElement('div');
	    this.siteLoader.className = "site-loader site-loader--animate ";
	    document.body.appendChild(this.siteLoader);

	    this.siteLoader.innerHTML = blockSiteLoader;

	    var that = this;
	    setTimeout(function() {
	      that.el.className         = "app-loader app-loader--animate app-loader--animate-in";
	      that.siteLoader.className = "site-loader site-loader--animate site-loader--animate-in";
	      that.ready();
	    }, 0)
	  },

	  ready: function() {

	  },

	  remove: function() {
	    if(this.el.parentNode) {
	      this.el.parentNode.removeChild(this.el);
	    }
	  }

	}

/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	var StackBlurRGBA = __webpack_require__(29);

	module.exports = {

	  // defaults
	  loadingProgress: 0,
	  animationProgress: 0,
	  bgStyle: '#69665f',
	  fillStyle: '#d2cdbf',


	  MAX_BLUR_RADIUS: 3,
	  TEXT_OFFSET_RATIO: 0.1,
	  BLUR_MAX_OFFSET: 10,
	  PRELOAD_BAR_ANGLE: 30 * Math.PI / 180,
	  CHARACTER_WIDTH: 49,
	  CHARACTER_HEIGHT: 50,
	  WIDTH: 722,
	  HEIGHT: 56,

	  characterBuffers: {},
	  blurO: null,
	  blurOCtx: null,
	  blurOBuffers: [],
	  infos : [
	    {
	        character: 'a',
	        offsetX: -339
	    },
	    {
	        character: 'n',
	        offsetX: -223
	    },
	    {
	        character: 'o',
	        offsetX: -102
	    },
	    {
	        character: 'm',
	        offsetX: 21
	    },
	    {
	        character: 'a',
	        offsetX: 140
	    },
	    {
	        character: 'l',
	        offsetX: 247
	    },
	    {
	        character: 'y',
	        offsetX: 343
	    }
	  ],

	  a : function (ctx) {
	    ctx.moveTo(33.8,35);
	    ctx.lineTo(14.8,35);
	    ctx.lineTo(9.4,47.6);
	    ctx.lineTo(3.9,47.6);
	    ctx.lineTo(24.5,0.7);
	    ctx.lineTo(44.5,47.5);
	    ctx.lineTo(39,47.5);
	    ctx.lineTo(33.8,35);
	    ctx.closePath();
	    ctx.moveTo(31.9,30.3);
	    ctx.lineTo(24.4,12.4);
	    ctx.lineTo(16.8,30.3);
	    ctx.lineTo(31.9,30.3);
	  },

	  n : function (ctx) {
	    ctx.moveTo(4.2,46.6);
	    ctx.lineTo(4.2,0);
	    ctx.lineTo(39,36.5);
	    ctx.lineTo(39,1.9);
	    ctx.lineTo(44,1.9);
	    ctx.lineTo(44,48.6);
	    ctx.lineTo(9.2,12.1);
	    ctx.lineTo(9.2,46.6);
	    ctx.lineTo(4.2,46.6);
	  },

	  o : function (ctx) {
	    ctx.moveTo(1.5,24.3);
	    ctx.bezierCurveTo(1.5,11,11.9,1.2,24.8,1.2);
	    ctx.bezierCurveTo(37.7,1.2,48,10.9,48,24.3);
	    ctx.bezierCurveTo(48,37.6,37.7,47.4,24.8,47.4);
	    ctx.bezierCurveTo(11.9,47.4,1.5,37.5,1.5,24.3);
	    ctx.closePath();
	    ctx.moveTo(6.6,24.3);
	    ctx.bezierCurveTo(6.6,34.6,14.7,42.7,24.8,42.7);
	    ctx.bezierCurveTo(34.9,42.7,43,34.5,43,24.3);
	    ctx.bezierCurveTo(43,14,34.9,5.9,24.8,5.9);
	    ctx.bezierCurveTo(14.7,5.9,6.6,14,6.6,24.3);
	  },

	  m : function (ctx) {
	    ctx.moveTo(0,47.6);
	    ctx.lineTo(7.4,0.4);
	    ctx.lineTo(24.6,38.1);
	    ctx.lineTo(42.1,0.3);
	    ctx.lineTo(49.1,47.5);
	    ctx.lineTo(44,47.5);
	    ctx.lineTo(39.8,16.4);
	    ctx.lineTo(24.6,49.4);
	    ctx.lineTo(9.6,16.4);
	    ctx.lineTo(5.1,47.6);
	    ctx.lineTo(0,47.6);
	  },

	  l : function (ctx) {
	    ctx.moveTo(20.8,1.9);
	    ctx.lineTo(20.8,41.9);
	    ctx.lineTo(33.1,41.9);
	    ctx.lineTo(33.1,46.6);
	    ctx.lineTo(15.8,46.6);
	    ctx.lineTo(15.8,1.9);
	    ctx.lineTo(20.8,1.9);
	  },

	  y : function (ctx) {
	    ctx.moveTo(22.4,27.3);
	    ctx.lineTo(7.7,1.9);
	    ctx.lineTo(13.5,1.9);
	    ctx.lineTo(24.9,21.9);
	    ctx.lineTo(36.4,1.986);
	    ctx.lineTo(42.2,1.986);
	    ctx.lineTo(27.3,27.3);
	    ctx.lineTo(27.3,46.5);
	    ctx.lineTo(22.3,46.5);
	    ctx.lineTo(22.3,27.3);
	  },

	  createLogoBuffers: function() {

	      var infos = this.infos;
	      var info;
	      for(var i = 0, len = infos.length; i < len; ++i) {
	          info = infos[i];
	          if(!this.characterBuffers[info.character]) {
	              this.characterBuffers[info.character] = this.createCharacterBuffer(info.character);
	          }
	      }

	      // create blur O buffers
	      for(i = 1; i <= this.MAX_BLUR_RADIUS; ++i) {
	          this.blurO = document.createElement('canvas');
	          this.blurOCtx = this.blurO.getContext('2d');
	          this.blurO.width = this.CHARACTER_WIDTH + 2 * i;
	          this.blurO.height = this.CHARACTER_HEIGHT + 2 * i;
	          this.blurOCtx.drawImage(this.characterBuffers.o, i, i);
	          StackBlurRGBA(this.blurOCtx, 0, 0, this.blurO.width, this.blurO.height, i);
	          this.blurOBuffers.push(this.blurO);
	      }
	  },

	  createCharacterBuffer: function(character) {
	    var canvas = document.createElement('canvas');
	    var ctx = canvas.getContext('2d');
	    canvas.width = this.CHARACTER_WIDTH;
	    canvas.height = this.CHARACTER_HEIGHT;
	    ctx.fillStyle = '#00ff00';
	    switch(character.toLowerCase()) {
	      case 'a':
	        this.a(ctx);
	      break;
	      case 'n':
	        this.n(ctx);
	      break;
	      case 'o':
	        this.o(ctx);
	      break;
	      case 'm':
	        this.m(ctx);
	      break;
	      case 'l':
	        this.l(ctx);
	      break;
	      case 'y':
	        this.y(ctx);
	      break;
	    }
	    ctx.fill();
	    return canvas;
	  },

	  renderCanvas: function(element) {
	    var canvas = element;
	    var ctx = canvas.getContext('2d');
	    // reset
	    ctx.globalCompositeOperation = 'source-over';
	    ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT );

	    ctx.save();
	    ctx.translate(this.WIDTH / 2, this.HEIGHT / 2);

	    for(var i = 0, len = this.infos.length; i < len; ++i) {
	      ctx.save();
	      info = this.infos[i];
	      var logoAnimation = this.animationProgress; // used for movement
	      ctx.translate(info.offsetX * ((1 - this.TEXT_OFFSET_RATIO) + logoAnimation * this.TEXT_OFFSET_RATIO), 0);
	      ctx.translate(-this.CHARACTER_WIDTH / 2, -this.CHARACTER_HEIGHT / 2);

	      if(info.character == 'o' && logoAnimation < 1) {
	          ctx.save();
	          ctx.beginPath();
	          ctx.arc(this.CHARACTER_WIDTH / 2, this.CHARACTER_HEIGHT / 2, 22, 0, Math.PI * 2, true);
	          ctx.rect(0, 0, this.CHARACTER_WIDTH + this.BLUR_MAX_OFFSET + this.MAX_BLUR_RADIUS, this.CHARACTER_HEIGHT);
	          ctx.clip();
	          ctx.closePath();
	          var blurOIndex = ~~((1 - logoAnimation) * this.MAX_BLUR_RADIUS * 0.9999);
	          ctx.globalAlpha = 0.5;
	          ctx.drawImage(this.blurOBuffers[blurOIndex], (1 - logoAnimation) * this.BLUR_MAX_OFFSET - blurOIndex - 1, - blurOIndex - 1);
	          ctx.restore();
	      }

	      ctx.drawImage(this.characterBuffers[info.character], 0, 0);
	      ctx.restore();
	    }

	    ctx.restore();

	    ctx.globalCompositeOperation = 'source-in';

	    ctx.fillStyle = this.bgStyle;
	    ctx.fillRect(0, 0, this.WIDTH , this.HEIGHT );

	    ctx.globalCompositeOperation = 'source-atop';
	    var preloaderBarExtraWidth = this.HEIGHT * Math.sin(this.PRELOAD_BAR_ANGLE);
	    var preloadBarWidth = (preloaderBarExtraWidth + this.WIDTH) * this.loadingProgress;
	    ctx.beginPath();
	    ctx.fillStyle = this.fillStyle;
	    ctx.moveTo(-preloaderBarExtraWidth, 0);
	    ctx.lineTo(preloadBarWidth, 0);
	    ctx.lineTo(preloadBarWidth - preloaderBarExtraWidth, this.HEIGHT);
	    ctx.lineTo(- preloaderBarExtraWidth, this.HEIGHT);
	    ctx.closePath();
	    ctx.fill();
	    ctx.restore();
	  },

	  init: function(element) {
	    element.width = this.WIDTH;
	    element.height = this.HEIGHT;
	    this.render(element);
	  },

	  render: function(element) {
	    this.createLogoBuffers();
	    this.renderCanvas(element);
	  }

	}

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	/*

	StackBlur - a fast almost Gaussian Blur For Canvas

	Version:    0.5
	Author:     Mario Klingemann
	Contact:    mario@quasimondo.com
	Website:    http://www.quasimondo.com/StackBlurForCanvas
	Twitter:    @quasimondo

	In case you find this class useful - especially in commercial projects -
	I am not totally unhappy for a small donation to my PayPal account
	mario@quasimondo.de

	Or support me on flattr:
	https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

	Copyright (c) 2010 Mario Klingemann

	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following
	conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.
	*/

	var stackBlurRGBA = (function(){

	    var mul_table = [
	        512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,
	        454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,
	        482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,
	        437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,
	        497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,
	        320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,
	        446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,
	        329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,
	        505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,
	        399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,
	        324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,
	        268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,
	        451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,
	        385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,
	        332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,
	        289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];


	    var shg_table = [
	             9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
	            17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
	            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
	            20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
	            21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
	            21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
	            22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
	            22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
	            23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
	            23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
	            23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
	            23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
	            24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
	            24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
	            24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
	            24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24 ];

	    function stackBlurRGBA( context, top_x, top_y, width, height, radius )
	    {
	        if ( isNaN(radius) || radius < 1 ) return;
	        radius |= 0;

	        var imageData;

	        try {
	          try {
	            imageData = context.getImageData( top_x, top_y, width, height );
	          } catch(e) {

	            // NOTE: this part is supposedly only needed if you want to work with local files
	            // so it might be okay to remove the whole try/catch block and just use
	            // imageData = context.getImageData( top_x, top_y, width, height );
	            try {
	                netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
	                imageData = context.getImageData( top_x, top_y, width, height );
	            } catch(e) {
	                alert("Cannot access local image");
	                throw new Error("unable to access local image data: " + e);
	                return;
	            }
	          }
	        } catch(e) {
	          alert("Cannot access image");
	          throw new Error("unable to access image data: " + e);
	        }

	        var pixels = imageData.data;

	        var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum,
	        r_out_sum, g_out_sum, b_out_sum, a_out_sum,
	        r_in_sum, g_in_sum, b_in_sum, a_in_sum,
	        pr, pg, pb, pa, rbs;

	        var div = radius + radius + 1;
	        var w4 = width << 2;
	        var widthMinus1  = width - 1;
	        var heightMinus1 = height - 1;
	        var radiusPlus1  = radius + 1;
	        var sumFactor = radiusPlus1 * ( radiusPlus1 + 1 ) / 2;

	        var stackStart = new BlurStack();
	        var stack = stackStart;
	        for ( i = 1; i < div; i++ )
	        {
	            stack = stack.next = new BlurStack();
	            if ( i == radiusPlus1 ) var stackEnd = stack;
	        }
	        stack.next = stackStart;
	        var stackIn = null;
	        var stackOut = null;

	        yw = yi = 0;

	        var mul_sum = mul_table[radius];
	        var shg_sum = shg_table[radius];

	        for ( y = 0; y < height; y++ )
	        {
	            r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

	            r_out_sum = radiusPlus1 * ( pr = pixels[yi] );
	            g_out_sum = radiusPlus1 * ( pg = pixels[yi+1] );
	            b_out_sum = radiusPlus1 * ( pb = pixels[yi+2] );
	            a_out_sum = radiusPlus1 * ( pa = pixels[yi+3] );

	            r_sum += sumFactor * pr;
	            g_sum += sumFactor * pg;
	            b_sum += sumFactor * pb;
	            a_sum += sumFactor * pa;

	            stack = stackStart;

	            for( i = 0; i < radiusPlus1; i++ )
	            {
	                stack.r = pr;
	                stack.g = pg;
	                stack.b = pb;
	                stack.a = pa;
	                stack = stack.next;
	            }

	            for( i = 1; i < radiusPlus1; i++ )
	            {
	                p = yi + (( widthMinus1 < i ? widthMinus1 : i ) << 2 );
	                r_sum += ( stack.r = ( pr = pixels[p])) * ( rbs = radiusPlus1 - i );
	                g_sum += ( stack.g = ( pg = pixels[p+1])) * rbs;
	                b_sum += ( stack.b = ( pb = pixels[p+2])) * rbs;
	                a_sum += ( stack.a = ( pa = pixels[p+3])) * rbs;

	                r_in_sum += pr;
	                g_in_sum += pg;
	                b_in_sum += pb;
	                a_in_sum += pa;

	                stack = stack.next;
	            }


	            stackIn = stackStart;
	            stackOut = stackEnd;
	            for ( x = 0; x < width; x++ )
	            {
	                pixels[yi+3] = pa = (a_sum * mul_sum) >> shg_sum;
	                if ( pa != 0 )
	                {
	                    pa = 255 / pa;
	                    pixels[yi]   = ((r_sum * mul_sum) >> shg_sum) * pa;
	                    pixels[yi+1] = ((g_sum * mul_sum) >> shg_sum) * pa;
	                    pixels[yi+2] = ((b_sum * mul_sum) >> shg_sum) * pa;
	                } else {
	                    pixels[yi] = pixels[yi+1] = pixels[yi+2] = 0;
	                }

	                r_sum -= r_out_sum;
	                g_sum -= g_out_sum;
	                b_sum -= b_out_sum;
	                a_sum -= a_out_sum;

	                r_out_sum -= stackIn.r;
	                g_out_sum -= stackIn.g;
	                b_out_sum -= stackIn.b;
	                a_out_sum -= stackIn.a;

	                p =  ( yw + ( ( p = x + radius + 1 ) < widthMinus1 ? p : widthMinus1 ) ) << 2;

	                r_in_sum += ( stackIn.r = pixels[p]);
	                g_in_sum += ( stackIn.g = pixels[p+1]);
	                b_in_sum += ( stackIn.b = pixels[p+2]);
	                a_in_sum += ( stackIn.a = pixels[p+3]);

	                r_sum += r_in_sum;
	                g_sum += g_in_sum;
	                b_sum += b_in_sum;
	                a_sum += a_in_sum;

	                stackIn = stackIn.next;

	                r_out_sum += ( pr = stackOut.r );
	                g_out_sum += ( pg = stackOut.g );
	                b_out_sum += ( pb = stackOut.b );
	                a_out_sum += ( pa = stackOut.a );

	                r_in_sum -= pr;
	                g_in_sum -= pg;
	                b_in_sum -= pb;
	                a_in_sum -= pa;

	                stackOut = stackOut.next;

	                yi += 4;
	            }
	            yw += width;
	        }


	        for ( x = 0; x < width; x++ )
	        {
	            g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

	            yi = x << 2;
	            r_out_sum = radiusPlus1 * ( pr = pixels[yi]);
	            g_out_sum = radiusPlus1 * ( pg = pixels[yi+1]);
	            b_out_sum = radiusPlus1 * ( pb = pixels[yi+2]);
	            a_out_sum = radiusPlus1 * ( pa = pixels[yi+3]);

	            r_sum += sumFactor * pr;
	            g_sum += sumFactor * pg;
	            b_sum += sumFactor * pb;
	            a_sum += sumFactor * pa;

	            stack = stackStart;

	            for( i = 0; i < radiusPlus1; i++ )
	            {
	                stack.r = pr;
	                stack.g = pg;
	                stack.b = pb;
	                stack.a = pa;
	                stack = stack.next;
	            }

	            yp = width;

	            for( i = 1; i <= radius; i++ )
	            {
	                yi = ( yp + x ) << 2;

	                r_sum += ( stack.r = ( pr = pixels[yi])) * ( rbs = radiusPlus1 - i );
	                g_sum += ( stack.g = ( pg = pixels[yi+1])) * rbs;
	                b_sum += ( stack.b = ( pb = pixels[yi+2])) * rbs;
	                a_sum += ( stack.a = ( pa = pixels[yi+3])) * rbs;

	                r_in_sum += pr;
	                g_in_sum += pg;
	                b_in_sum += pb;
	                a_in_sum += pa;

	                stack = stack.next;

	                if( i < heightMinus1 )
	                {
	                    yp += width;
	                }
	            }

	            yi = x;
	            stackIn = stackStart;
	            stackOut = stackEnd;
	            for ( y = 0; y < height; y++ )
	            {
	                p = yi << 2;
	                pixels[p+3] = pa = (a_sum * mul_sum) >> shg_sum;
	                if ( pa > 0 )
	                {
	                    pa = 255 / pa;
	                    pixels[p]   = ((r_sum * mul_sum) >> shg_sum ) * pa;
	                    pixels[p+1] = ((g_sum * mul_sum) >> shg_sum ) * pa;
	                    pixels[p+2] = ((b_sum * mul_sum) >> shg_sum ) * pa;
	                } else {
	                    pixels[p] = pixels[p+1] = pixels[p+2] = 0;
	                }

	                r_sum -= r_out_sum;
	                g_sum -= g_out_sum;
	                b_sum -= b_out_sum;
	                a_sum -= a_out_sum;

	                r_out_sum -= stackIn.r;
	                g_out_sum -= stackIn.g;
	                b_out_sum -= stackIn.b;
	                a_out_sum -= stackIn.a;

	                p = ( x + (( ( p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1 ) * width )) << 2;

	                r_sum += ( r_in_sum += ( stackIn.r = pixels[p]));
	                g_sum += ( g_in_sum += ( stackIn.g = pixels[p+1]));
	                b_sum += ( b_in_sum += ( stackIn.b = pixels[p+2]));
	                a_sum += ( a_in_sum += ( stackIn.a = pixels[p+3]));

	                stackIn = stackIn.next;

	                r_out_sum += ( pr = stackOut.r );
	                g_out_sum += ( pg = stackOut.g );
	                b_out_sum += ( pb = stackOut.b );
	                a_out_sum += ( pa = stackOut.a );

	                r_in_sum -= pr;
	                g_in_sum -= pg;
	                b_in_sum -= pb;
	                a_in_sum -= pa;

	                stackOut = stackOut.next;

	                yi += width;
	            }
	        }

	        context.putImageData( imageData, top_x, top_y );

	    }

	    function BlurStack()
	    {
	        this.r = 0;
	        this.g = 0;
	        this.b = 0;
	        this.a = 0;
	        this.next = null;
	    }

	    return stackBlurRGBA;

	}());


	module.exports = stackBlurRGBA;


/***/ }

});