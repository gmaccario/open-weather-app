<?php
/**
 *
 * PHP version >= 7.0
 *
 * @category Console_Command
 * @package  App\Console\Commands
 */

namespace App\Console\Commands;


use App\Post;

use Log;
use Exception;
use Illuminate\Console\Command;

/**
 * Class SaveCurrentWeatherCommand
 *
 * @category Console_Command
 * @package  App\Console\Commands
 */
class SaveCurrentWeatherCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = "run:current";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Save current weather";


    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
      Log::info('SaveCurrentWeatherCommand.handle()');
    }
}
