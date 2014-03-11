// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for single bar
 * in concentration chart in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONT_NORMAL = new PhetFont( 12 ),
    FONT_SMALL = new PhetFont( 8 ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    Util = require( 'DOT/Util' ),
    ViewModes = require( 'model/ViewModes' ),

  // strings
    negligibleString = require( 'string!ACID_BASE_SOLUTIONS/negligible' );

  /**
   * Constructor for single bar in equilibrium concentration chart.
   * @param {model} model Model of simulation. Should contain properties 'viewMode' and 'solution'
   * @param {string} solution Which corresponds to the given bar.
   * @param {property} property Property of model for observing. Concentration of single molecule type
   * @param {object} options for new node
   * @constructor
   */

  function EquilibriumConcentrationSingleBar( model, solution, property, options ) {
    var self = this,
      rectangle,
      text,
      textPow,
      setVisibility,
      height = options.height;
    Node.call( this );

    // add rectangle to represent concentration
    this.addChild( rectangle = new Rectangle( 0, 0, 25, 0, {fill: options.fill} ) );
    rectangle.rotate( Math.PI );

    // add vertical text for concentration (normal text + exponent text)
    this.addChild( text = new Text( '123', {font: FONT_NORMAL, centerX: 2, centerY: -10} ) );
    this.addChild( textPow = new Text( '123', {font: FONT_SMALL, centerX: -10, centerY: -10} ) );
    text.rotate( -Math.PI / 2 );
    textPow.rotate( -Math.PI / 2 );

    // set visibility of bar
    setVisibility = function() {
      self.setVisible( model.viewMode === ViewModes.EQUILIBRIUM && model.solution === solution );
    };

    // set height of bar
    var setBarHeightBinded = setBarHeight.bind( this, height, rectangle, text, textPow );

    // observer for properties
    var observer = function() {
      setVisibility();

      // if bar not visible then prevent updating
      if ( self.visible ) {
        setBarHeightBinded( property.value );
      }
    };

    model.property( 'viewMode' ).link( observer );
    model.property( 'solution' ).link( observer );
    property.link( observer );
  }

  // set height of bar
  var setBarHeight = function( height, rectangle, text, textPow, value ) {
    var barHeight,
      pow;

    barHeight = Math.abs( Util.log10( value ) + 8 ) * height / 10;

    // set bar height
    if ( isFinite( barHeight ) ) {
      rectangle.setRectHeight( barHeight );
    }

    // set concentration text
    if ( value < 1e-13 ) {
      text.setText( negligibleString );
      textPow.setVisible( false );
    }
    else if ( value <= 1 ) {
      // find pow
      pow = Math.floor( Util.log10( value ) );

      // set value
      value = (value * Math.pow( 10, -pow ));
      if ( Math.abs( value - 10 ) < 1e-2 ) { // replace 10.00 to 1.00 x 10
        pow++;
        value = 1;
      }
      text.setText( Util.toFixed( value, 2 ) + ' x ' + '10' );

      // set pow
      textPow.setText( pow );
      textPow.centerY = -text.getHeight() - 10;
    }
    else {
      text.setText( Util.toFixed( value, 1 ) );
      textPow.setVisible( false );
    }
  };

  return inherit( Node, EquilibriumConcentrationSingleBar );
} );
