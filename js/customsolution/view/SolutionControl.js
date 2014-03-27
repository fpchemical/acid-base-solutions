// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control for modifying a custom solutions.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var ArrowButton = require( 'SCENERY_PHET/ArrowButton' );
  var ConcentrationSlider = require( 'ACID_BASE_SOLUTIONS/customsolution/view/ConcentrationSlider' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Util = require( 'DOT/Util' );
  var ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var HSeparator = require( 'SUN/HSeparator' );
  var StrengthSlider = require( 'ACID_BASE_SOLUTIONS/customsolution/view/StrengthSlider' );

  // strings
  var acidString = require( 'string!ACID_BASE_SOLUTIONS/acid' );
  var baseString = require( 'string!ACID_BASE_SOLUTIONS/base' );
  var initialConcentrationString = require( 'string!ACID_BASE_SOLUTIONS/initialConcentration' );
  var solutionString = require( 'string!ACID_BASE_SOLUTIONS/solution' );
  var strengthString = require( 'string!ACID_BASE_SOLUTIONS/strength' );
  var strongString = require( 'string!ACID_BASE_SOLUTIONS/strong' );
  var weakString = require( 'string!ACID_BASE_SOLUTIONS/weak' );

  // constants
  var SUBTITLE_FONT = new PhetFont( 12 );
  var RADIO_BUTTON_FONT = new PhetFont( 12 );
  var RADIO_BUTTON_OPTIONS = { radius: 7 };
  var ARROW_STEP = 0.1; // concentration delta for arrow button
  var ARROW_HEIGHT = 15;
  var ARROW_BUTTON_OPTIONS = { arrowHeight: ARROW_HEIGHT, arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2 };
  var CONCENTRATION_FONT = new PhetFont( 14 );
  var CONCENTRATION_DECIMALS = 3;

  /**
   * @param {SolutionMenuModel} solutionMenuModel
   * @param {*} options
   * @constructor
   */
  function SolutionControl( solutionMenuModel, options ) {

    options = _.extend( {
      titleFont: new PhetFont(),
      spacing: 4,
      align: 'left'
    }, options );

    var concentrationProperty = solutionMenuModel.concentrationProperty;
    var concentrationRange = ABSConstants.CONCENTRATION_RANGE;

    // 'Solution' title
    var solutionTitle = new Text( solutionString, { font: options.titleFont } );

    // type (acid or base) radio buttons
    var typeControl = new HBox( {
      spacing: 20,
      children: [
        new AquaRadioButton( solutionMenuModel.isAcidProperty, true, new Text( acidString, {font: RADIO_BUTTON_FONT} ), RADIO_BUTTON_OPTIONS ),
        new AquaRadioButton( solutionMenuModel.isAcidProperty, false, new Text( baseString, {font: RADIO_BUTTON_FONT} ), RADIO_BUTTON_OPTIONS )
      ]
    } );

    // concentration title
    var concentrationTitle = new Text( initialConcentrationString, { font: SUBTITLE_FONT } );

    // concentration readout
    var readoutText = new Text( Util.toFixed( solutionMenuModel.concentrationProperty.value, CONCENTRATION_DECIMALS ), { font: CONCENTRATION_FONT } );
    var readoutBackground = new Rectangle( 0, 0, 1.5 * readoutText.width, 1.5 * readoutText.height, 4, 4, { fill: 'white' } );
    var readoutNode = new Node( { children: [ readoutBackground, readoutText ] } );
    readoutText.center = readoutBackground.center;

    // arrow buttons
    var leftArrowButton = new ArrowButton( 'left', function() {
      concentrationProperty.value = Math.max( concentrationProperty.value - ARROW_STEP, concentrationRange.min );
    }, ARROW_BUTTON_OPTIONS );
    var rightArrowButton = new ArrowButton( 'right', function() {
      concentrationProperty.value = Math.min( concentrationProperty.value + ARROW_STEP, concentrationRange.max );
    }, ARROW_BUTTON_OPTIONS );

    // concentration value control
    var concentrationValueControl = new HBox( {
      spacing: 8,
      children: [ leftArrowButton, readoutNode, rightArrowButton ]
    } );

    // concentration slider
    var concentrationSlider = new ConcentrationSlider( concentrationProperty, concentrationRange );

    // strength control
    var strengthTitle = new Text( strengthString, { font: SUBTITLE_FONT } );
    var strengthRadioButtons = new HBox( { spacing: 10, children: [
      new AquaRadioButton( solutionMenuModel.isWeakProperty, true, new Text( weakString, {font: RADIO_BUTTON_FONT} ), RADIO_BUTTON_OPTIONS ),
      new AquaRadioButton( solutionMenuModel.isWeakProperty, false, new Text( strongString, {font: RADIO_BUTTON_FONT} ), RADIO_BUTTON_OPTIONS )
    ] } );
    var strengthSlider = new StrengthSlider( solutionMenuModel.strengthProperty, ABSConstants.WEAK_STRENGTH_RANGE );

    options.children = [
      solutionTitle,
      typeControl,
      concentrationTitle,
      concentrationValueControl,
      concentrationSlider,
      strengthTitle,
      strengthRadioButtons,
      strengthSlider
    ];

    // compute separator width
    var separatorWidth = 0;
    options.children.forEach( function( child ) {
      separatorWidth = Math.max( child.width, separatorWidth );
    } );

    // separators for sub-panels
    var concentrationSeparator = new HSeparator( separatorWidth );
    var strengthSeparator = new HSeparator( separatorWidth );
    options.children.splice( options.children.indexOf( concentrationTitle ), 0, concentrationSeparator );
    options.children.splice( options.children.indexOf( strengthTitle ), 0, strengthSeparator );

    // brute-force layout
    var titleYSpacing = 8;
    var subtitleYSpacing = 6;
    var separatorYSpacing = 6;
    var controlYSpacing = 6;
    // controls are all center justified
    typeControl.centerX = concentrationValueControl.centerX = concentrationSlider.centerX = strengthRadioButtons.centerX = strengthSlider.centerX = separatorWidth / 2;
    // titles and subtitles are left justified
    typeControl.top = solutionTitle.bottom + titleYSpacing;
    concentrationSeparator.top = typeControl.bottom + separatorYSpacing;
    concentrationTitle.top = concentrationSeparator.bottom + separatorYSpacing;
    concentrationValueControl.top = concentrationTitle.bottom + subtitleYSpacing;
    concentrationSlider.top = concentrationValueControl.bottom + controlYSpacing;
    strengthSeparator.top = concentrationSlider.bottom + separatorYSpacing;
    strengthTitle.top = strengthSeparator.bottom + separatorYSpacing;
    strengthRadioButtons.top = strengthTitle.bottom + subtitleYSpacing;
    strengthSlider.top = strengthRadioButtons.bottom + controlYSpacing;

    Node.call( this, options );

    // hide strength slider for weak solutions
    solutionMenuModel.isWeakProperty.link( function( isWeak ) {
      strengthSlider.visible = isWeak;
    } );

    // update the readout text when concentration value changes
    concentrationProperty.link( function( concentration ) {
      readoutText.text = Util.toFixed( concentration, CONCENTRATION_DECIMALS );
    } );

    // disable arrow buttons
    concentrationProperty.link( function( concentration ) {
      leftArrowButton.setEnabled( concentration > concentrationRange.min );
      rightArrowButton.setEnabled( concentration < concentrationRange.max );
    } );
  }

  return inherit( Node, SolutionControl );
} );