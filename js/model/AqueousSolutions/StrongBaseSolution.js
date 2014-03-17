// Copyright 2002-2013, University of Colorado Boulder

/**
 *  An aqueous solution whose solute is a strong base.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Solutions = require( 'model/Solutions' ),
    AqueousSolutionAbstract = require( './AqueousSolutionAbstract' ),

  // [M+] = c
    getProductConcentration = function( concentration ) {
      return concentration;
    },

  // [OH-] = c
    getOHConcentration = function( concentration ) {
      return concentration;
    },

  // [H3O+] = Kw / [OH-]
    getH3OConcentration = function( OHConcentration ) {
      return CONSTANTS.WATER_EQUILIBRIUM_CONSTANT / OHConcentration;
    },

    isValidStrength = function( strength ) {
      return strength > CONSTANTS.CONCENTRATION_RANGE.max;
    },

  // constants
    CONSTANTS = require( 'model/Constants/Constants' ),
    STRENGTH_DEFAULT = CONSTANTS.STRONG_STRENGTH,
    CONCENTRATION_DEFAULT = CONSTANTS.CONCENTRATION_RANGE.defaultValue,
    OH_CONCENTRATION_DEFAULT = getOHConcentration( CONCENTRATION_DEFAULT ),
    H3O_CONCENTRATION_DEFAULT = getH3OConcentration( OH_CONCENTRATION_DEFAULT ),
    IS_VALID_STRENGTH_DEFAULT = isValidStrength( STRENGTH_DEFAULT ),
    PRODUCT_CONCENTRATION_DEFAULT = getProductConcentration( CONCENTRATION_DEFAULT );

  function StrongBaseSolution() {
    var self = this;

    // set default strength and add common properties
    AqueousSolutionAbstract.call( this, {
      strength: STRENGTH_DEFAULT,
      concentration: CONCENTRATION_DEFAULT,
      productConcentration: PRODUCT_CONCENTRATION_DEFAULT,
      OHConcentration: OH_CONCENTRATION_DEFAULT,
      H3OConcentration: H3O_CONCENTRATION_DEFAULT,
      isValidStrength: IS_VALID_STRENGTH_DEFAULT
    } );

    this.type = Solutions.STRONG_BASE;

    this.relations = [
      {type: 'MOH', property: 'soluteConcentration'},
      {type: 'M', property: 'productConcentration'},
      {type: 'OH', property: 'OHConcentration'}
    ];

    // set links between concentrations
    this.property( 'concentration' ).link( function( value ) {
      self.productConcentration = getProductConcentration( value );
      self.OHConcentration = getOHConcentration( value );
    } );

    this.property( 'OHConcentration' ).link( function( value ) {
      self.H3OConcentration = getH3OConcentration( value );
    } );

    this.property( 'strength' ).link( function( strength ) {
      self.isValidStrength = isValidStrength( strength );
    } );
  }

  return inherit( AqueousSolutionAbstract, StrongBaseSolution );
} );