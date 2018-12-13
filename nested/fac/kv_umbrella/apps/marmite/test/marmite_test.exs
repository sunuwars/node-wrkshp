defmodule MarmiteTest do
  use ExUnit.Case
  doctest Marmite

  test "greets the world" do
    assert Marmite.hello() == :world
  end
end
