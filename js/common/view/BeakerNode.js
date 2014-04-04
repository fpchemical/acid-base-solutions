// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation of a beaker that is filled to the top with a solution.
 * Ticks on the left edge of the beaker. Origin is at the bottom center.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Shape = require( 'KITE/Shape' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var pattern_0value_1units = require( 'string!ACID_BASE_SOLUTIONS/pattern.0value.1units' );
  var units_litersString = require( 'string!ACID_BASE_SOLUTIONS/liters' );

  // constants
  var MAJOR_TICK_LENGTH = 25;
  var MINOR_TICK_LENGTH = 10;
  var MINOR_TICKS_PER_MAJOR_TICK = 5;
  var MINOR_TICK_SPACING = 0.1; // L
  var RIM_OFFSET = 10;
  var TICK_LABEL_X_SPACING = 20;

  /**
   * @param {Beaker} beaker
   * @constructor
   */
  function BeakerNode( beaker ) {
    // outline of the beaker, starting from upper left
    var BEAKER_WIDTH = beaker.size.width,
      BEAKER_HEIGHT = beaker.size.height,
      outlineShape = new Shape()
        .moveTo( -BEAKER_WIDTH / 2 - RIM_OFFSET, -BEAKER_HEIGHT - RIM_OFFSET )
        .lineTo( -BEAKER_WIDTH / 2, -BEAKER_HEIGHT )
        .lineTo( -BEAKER_WIDTH / 2, 0 )
        .lineTo( BEAKER_WIDTH / 2, 0 )
        .lineTo( BEAKER_WIDTH / 2, -BEAKER_HEIGHT )
        .lineTo( (BEAKER_WIDTH / 2) + RIM_OFFSET, -BEAKER_HEIGHT - RIM_OFFSET ),
      fillShape = new Shape().lineTo( -BEAKER_WIDTH / 2, -BEAKER_HEIGHT )
        .lineTo( -BEAKER_WIDTH / 2, 0 )
        .lineTo( BEAKER_WIDTH / 2, 0 )
        .lineTo( BEAKER_WIDTH / 2, -BEAKER_HEIGHT ),
    // horizontal tick marks, left edge, from bottom up
      ticksParent,
      NUMBER_OF_TICKS = Math.round( 1 / MINOR_TICK_SPACING ),
      deltaY = BEAKER_HEIGHT / NUMBER_OF_TICKS;

    Node.call( this, {pickable: false} );

    // add water
    this.addChild( new Path( fillShape, {
      fill: 'rgba(193,222,227,0.7)'
    } ) );

    // add beaker
    this.addChild( new Path( outlineShape, {
      stroke: 'black',
      lineWidth: 3,
      lineCap: 'round',
      lineJoin: 'round'
    } ) );

    this.addChild( ticksParent = new Node() );

    var isMajorTick,
      y, leftX, rightX, tickShape, tickPath;
    for ( var i = 1; i <= NUMBER_OF_TICKS; i++ ) {

      // tick
      isMajorTick = ( i % MINOR_TICKS_PER_MAJOR_TICK === 0 );
      y = -( i * deltaY );
      leftX = BEAKER_WIDTH / 2;
      rightX = leftX - ( isMajorTick ? MAJOR_TICK_LENGTH : MINOR_TICK_LENGTH );
      tickShape = new Shape().moveTo( leftX, y ).lineTo( rightX, y );
      tickPath = new Path( tickShape, {
        stroke: 'black',
        lineWidth: 1.5,
        lineCap: 'round',
        lineJoin: 'bevel'
      } );

      ticksParent.addChild( tickPath );
    }

    // major tick label
    var label = StringUtils.format( pattern_0value_1units, '1', units_litersString );
    ticksParent.addChild( new Text( label, {
      font: new PhetFont( 18 ),
      fill: 'black',
      x: BEAKER_WIDTH / 2 - MAJOR_TICK_LENGTH - TICK_LABEL_X_SPACING,
      centerY: -deltaY * NUMBER_OF_TICKS
    } ) );

    this.translation = beaker.location;
  }

  return inherit( Node, BeakerNode );
} );
