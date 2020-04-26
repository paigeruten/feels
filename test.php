<?php

function feels(string $code) {
  $fp = fopen('tail.log', 'a');
  fwrite($fp, $code . "\n");
  fclose($fp);
}

function fib(int $n) {
  feels("fill(255,127,0,30); circle(map($n, 0, 10, 30, width-30), 30, 20);");
  if ($n <= 1) {
    return $n;
  } else {
    return fib($n - 1) + fib($n - 2);
  }
}

echo fib(10) . PHP_EOL;

