// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for the 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var SolutionsPanel = require( 'ACID_BASE_SOLUTIONS/introduction/view/SolutionsPanel' );
  var ToolsPanel = require( 'ACID_BASE_SOLUTIONS/common/view/ToolsPanel' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var ViewsPanel = require( 'ACID_BASE_SOLUTIONS/common/view/ViewsPanel' );
  var VStrut = require( 'SUN/VStrut' );

  // strings
  var solutionsString = require( 'string!ACID_BASE_SOLUTIONS/solutions' );
  var toolsString = require( 'string!ACID_BASE_SOLUTIONS/tools' );
  var viewsString = require( 'string!ACID_BASE_SOLUTIONS/views' );

  // constants
  var TITLE_OPTIONS = { font: new PhetFont( { size: 18, weight: 'bold' } ) };

  /**
   * @param {IntroductionModel} model
   * @constructor
   */
  function IntroductionControlPanel( model ) {

    // titles
    var solutionsTitle = new Text( solutionsString, TITLE_OPTIONS );
    var viewsTitle = new Text( viewsString, TITLE_OPTIONS );
    var toolsTitle = new Text( toolsString, TITLE_OPTIONS );

    // panels
    var solutionsPanel = new SolutionsPanel( model.property( 'solutionType' ) );
    var viewsPanel = new ViewsPanel( model.property( 'viewMode' ), model.property( 'solventVisible' ) );
    var toolsPanel = new ToolsPanel( model.property( 'toolMode' ) );

    var children = [
      solutionsTitle,
      new VStrut( 10 ),
      solutionsPanel,
      new VStrut( 20 ),
      viewsTitle,
      new VStrut( 10 ),
      viewsPanel,
      new VStrut( 20 ),
      toolsTitle,
      new VStrut( 10 ),
      toolsPanel
    ];

    Panel.call( this, new VBox( { align: 'left', children: children } ), {
      fill: 'rgb(208,212,255)',
      xMargin: 15,
      yMargin: 10
    } );
  }

  return inherit( Panel, IntroductionControlPanel );
} );
