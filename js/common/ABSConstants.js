// Copyright 2014-2015, University of Colorado Boulder

/**
 * Constants for simulation 'Acid-Base Solutions'.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );

  // constants
  var WEAK_STRENGTH_MAX = 1E2;

  var ABSConstants = {
    CONCENTRATION_RANGE: new RangeWithValue( 1E-3, 1, 1E-2 ),
    PH_RANGE: new RangeWithValue( 0, 14 ),
    WATER_EQUILIBRIUM_CONSTANT: 1E-14,
    WATER_CONCENTRATION: 55.6, // water concentration when it's used as a solvent, mol/L
    WEAK_STRENGTH_RANGE: new RangeWithValue( 1E-10, WEAK_STRENGTH_MAX, 1E-7 ),
    STRONG_STRENGTH: WEAK_STRENGTH_MAX + 1 // arbitrary, but needs to be greater than weak max
  };

  acidBaseSolutions.register( 'ABSConstants', ABSConstants );

  return ABSConstants;
} );